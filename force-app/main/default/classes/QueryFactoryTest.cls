/**
 * Copyright (c) 2014, FinancialForce.com, inc
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 *   are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *      this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice,
 *      this list of conditions and the following disclaimer in the documentation
 *      and/or other materials provided with the distribution.
 * - Neither the name of the FinancialForce.com, inc nor the names of its contributors
 *      may be used to endorse or promote products derived from this software without
 *      specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 *  THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 *  OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 *  OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
@isTest
private class QueryFactoryTest {

	@isTest
	static void fieldSelections(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('firstName');
		qf.selectField(Schema.Contact.SObjectType.fields.lastName);
		qf.selectFields( new Set<String>{'acCounTId', 'account.name'} );
		qf.selectFields( new List<String>{'homePhonE','fAX'} );
		qf.selectFields( new List<Schema.SObjectField>{ Contact.Email, Contact.Title } );
	}

	@isTest
	static void simpleFieldSelection() {
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('NAMe').selectFields( new Set<String>{'naMe', 'email'});
		String query = qf.toSOQL();
		System.assert( Pattern.matches('SELECT.*Name.*FROM.*',query), 'Expected Name field in query, got '+query);
		System.assert( Pattern.matches('SELECT.*Email.*FROM.*',query), 'Expected Name field in query, got '+query);
		qf.setLimit(100);
		System.assertEquals(100,qf.getLimit());
		System.assert( qf.toSOQL().endsWithIgnoreCase('LIMIT '+qf.getLimit()), 'Failed to respect limit clause:'+qf.toSOQL() );
	}

	@isTest
	static void simpleFieldCondition(){
		String whereClause = 'name = \'test\'';
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		qf.selectField('email');
		qf.setCondition( whereClause );
		System.assertEquals(whereClause,qf.getCondition());
		String query = qf.toSOQL();
		System.assert(query.endsWith('WHERE name = \'test\''),'Query should have ended with a filter on name, got: '+query);
	}

	@isTest
	static void duplicateFieldSelection() {
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('NAMe').selectFields( new Set<String>{'naMe', 'email'});
		String query = qf.toSOQL();
		System.assertEquals(1, query.countMatches('Name'), 'Expected one name field in query: '+query );
	}

	@isTest
	static void equalityCheck(){
		QueryFactory qf1 = new QueryFactory(Contact.SObjectType);
		QueryFactory qf2 = new QueryFactory(Contact.SObjectType);
		System.assertEquals(qf1,qf2);
		qf1.selectField('name');
		System.assertNotEquals(qf1,qf2);
		qf2.selectField('NAmE');
		System.assertEquals(qf1,qf2);
		qf1.selectField('name').selectFields( new Set<String>{ 'NAME', 'name' }).selectFields( new Set<Schema.SObjectField>{ Contact.Name, Contact.Name} );
		System.assertEquals(qf1,qf2);
	}

	@isTest
	static void nonReferenceField(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		QueryFactory.NonReferenceFieldException e;
		try{
			qf.selectField('name.title');
		}catch(QueryFactory.NonReferenceFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e,'Cross-object notation on a non-reference field should throw NonReferenceFieldException.');
	}

	@isTest
	static void invalidCrossObjectField(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		QueryFactory.InvalidFieldException e;
		try{
			qf.selectField('account.NOT_A_REAL_FIELD');
		}catch(QueryFactory.InvalidFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e,'Cross-object notation on a non-reference field should throw NonReferenceFieldException.');
	}

	@isTest
	static void invalidFieldTests(){
		List<Exception> exceptions = new List<Exception>();
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		try{
			qf.selectField('Not_a_field');
		}catch(QueryFactory.InvalidFieldException e){
			exceptions.add(e);
		}
		try{
			qf.selectFields( new Set<String>{ 'Not_a_field','alsoNotreal'});
		}catch(QueryFactory.InvalidFieldException e){
			exceptions.add(e);
		}
		try{
			qf.selectFields( new Set<Schema.SObjectField>{ null });
		}catch(QueryFactory.InvalidFieldException e){
			exceptions.add(e);
		}
		try{
			qf.selectFields( new List<Schema.SObjectField>{ null, Contact.title });
		}catch(QueryFactory.InvalidFieldException e){
			exceptions.add(e);
		}
		System.assertEquals(4,exceptions.size());
	}

	@isTest
	static void ordering(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		qf.selectField('email');
		qf.setCondition( 'name = \'test\'' );
		qf.addOrdering( new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) ).addOrdering( new QueryFactory.Ordering('Contact','CreatedDATE',QueryFactory.SortOrder.DESCENDING) );
		String query = qf.toSOQL();

		System.assertEquals(2,qf.getOrderings().size());
		System.assertEquals(Contact.name,qf.getOrderings()[0].getField() );
		System.assertEquals(QueryFactory.SortOrder.DESCENDING,qf.getOrderings()[1].getDirection() );


		System.assert( Pattern.matches('SELECT.*Name.*FROM.*',query), 'Expected Name field in query, got '+query);
		System.assert( Pattern.matches('SELECT.*Email.*FROM.*',query), 'Expected Name field in query, got '+query);
	}

	@isTest
	static void invalidField_string(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		Exception e;
		try{
			qf.selectField('not_a__field');
		}catch(QueryFactory.InvalidFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidFields_string(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		Exception e;
		try{
			qf.selectFields( new List<String>{'not_a__field'} );
		}catch(QueryFactory.InvalidFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidField_nullToken(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		Exception e;
		Schema.SObjectField token = null;
		try{
			qf.selectField( token );
		}catch(QueryFactory.InvalidFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidFields_nullToken(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		Exception e;
		List<Schema.SObjectField> token = new List<Schema.SObjectField>{
			null
		};
		try{
			qf.selectFields( token );
		}catch(QueryFactory.InvalidFieldException ex){
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidFields_noQueryFields(){
		Exception e;
		List<Schema.SObjectField> sObjectFields = new List<Schema.SObjectField>();
		try {
			QueryFactory.QueryField qfld = new QueryFactory.QueryField(sObjectFields);
		} catch (Exception ex) {
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidFields_noQueryField(){
		Exception e;
		Schema.SObjectField sObjectField;
		try {
			QueryFactory.QueryField qfld = new QueryFactory.QueryField(sObjectField);
		} catch (Exception ex) {
			e = ex;
		}
		System.assertNotEquals(null,e);
	}

	@isTest
	static void invalidFields_queryFieldsNotEquals(){
		Exception e;
		Schema.SObjectField sObjectField;
		QueryFactory.QueryField qfld = new QueryFactory.QueryField(Contact.Name);
		QueryFactory.QueryField qfld2 = new QueryFactory.QueryField(Contact.LastName);
		System.assert(!qfld.equals(qfld2));
	}

	@isTest
	static void queryIdFieldNotEquals(){
		//this is the equivalent of calling setField('account.name'), where table = Contact
		QueryFactory.QueryField qfld = new QueryFactory.QueryField(new List<Schema.SObjectField>{
			Schema.Contact.SObjectType.fields.AccountId,
			Schema.Account.SObjectType.fields.name
		});
		String fldString = qfld.toString();
	}

	@isTest
	static void queryIdFieldNotEqualsWrongObjType(){
		QueryFactory.QueryField qfld = new QueryFactory.QueryField(new List<Schema.SObjectField>{
			Schema.Contact.SObjectType.fields.AccountId});
		System.assert(!qfld.equals(new Contact()));
	}

	@isTest
	static void addChildQueriesWithChildRelationship_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
		//explicitly assert object accessibility when creating the subselect
		qf.subselectQuery('Tasks', true).selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		List<Contact> contacts = Database.query(qf.toSOQL());
		System.assert(contacts != null && contacts.size() == 1);
		System.assert(contacts[0].Tasks.size() == 1);
		System.assert(contacts[0].Tasks[0].Subject == 'test');
	}

	@isTest
	static void addChildQueriesWithChildRelationshipNoAccessibleCheck_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		//explicitly assert object accessibility when creating the subselect
		qf.subselectQuery('Tasks').selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		List<Contact> contacts = Database.query(qf.toSOQL());
		System.assert(contacts != null && contacts.size() == 1);
		System.assert(contacts[0].Tasks.size() == 1);
		System.assert(contacts[0].Tasks[0].Subject == 'test');
	}

	@isTest
	static void addChildQueriesWithChildRelationshipObjCheckIsAccessible_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
		Schema.ChildRelationship relationship;
		for (Schema.ChildRelationship childRow : descResult.getChildRelationships()){
        	//occasionally on some standard objects (Like Contact child of Contact) do not have a relationship name.
        	//if there is no relationship name, we cannot query on it, so throw an exception.
            if (childRow.getRelationshipName() == 'Tasks'){
                relationship = childRow;
            }
        }
       	//explicitly assert object accessibility when creating the subselect
		qf.subselectQuery(relationship, true).selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		List<Contact> contacts = Database.query(qf.toSOQL());
		System.assert(contacts != null && contacts.size() == 1);
		System.assert(contacts[0].Tasks.size() == 1);
		System.assert(contacts[0].Tasks[0].Subject == 'test');
	}

	@isTest
	static void addChildQueriesWithChildRelationshipObj_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
		Schema.ChildRelationship relationship;
		for (Schema.ChildRelationship childRow : descResult.getChildRelationships()){
        	//occasionally on some standard objects (Like Contact child of Contact) do not have a relationship name.
        	//if there is no relationship name, we cannot query on it, so throw an exception.
            if (childRow.getRelationshipName() == 'Tasks'){
                relationship = childRow;
            }
        }
       	//explicitly assert object accessibility when creating the subselect
		qf.subselectQuery(relationship).selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		List<Contact> contacts = Database.query(qf.toSOQL());
		System.assert(contacts != null && contacts.size() == 1);
		System.assert(contacts[0].Tasks.size() == 1);
		System.assert(contacts[0].Tasks[0].Subject == 'test');
	}

	@isTest
	static void addChildQueriesWithChildRelationshipNoAccessibleCheck_fail(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
		//explicitly assert object accessibility when creating the subselect
		//
		Exception e;
		try {
			qf.subselectQuery('Tas').selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		} catch (QueryFactory.InvalidSubqueryRelationshipException ex) {
			e = ex;
		}
		System.assertNotEquals(e, null);
	}

	@isTest
	static void addChildQueries_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;

		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name').selectField('Id').setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING, true);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
		//explicitly assert object accessibility when creating the subselect
		qf.subselectQuery(Task.SObjectType, true).selectField('Id').selectField('Subject').setCondition(' IsDeleted = false ');
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		List<Contact> contacts = Database.query(qf.toSOQL());
		System.assert(contacts != null && contacts.size() == 1);
		System.assert(contacts[0].Tasks.size() == 1);
		System.assert(contacts[0].Tasks[0].Subject == 'test');
	}

	@isTest
	static void addChildQuerySameRelationshipAgain_success(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
        Task tsk = new Task();
        tsk.WhoId = cont.Id;
        tsk.Subject = 'test';
        tsk.ActivityDate = System.today();
        insert tsk;
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		qf.selectField('Id');
		qf.setCondition( 'name like \'%test%\'' );
		qf.addOrdering( new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) ).addOrdering('CreatedBy.Name',QueryFactory.SortOrder.DESCENDING);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();
       	ChildRelationship relationship;
        for (Schema.ChildRelationship childRow : descResult.getChildRelationships()) {
            if (childRow.getRelationshipName() == 'Tasks') {
                relationship = childRow;
            }
        }
        System.assert(qf.getSubselectQueries() == null);
		QueryFactory childQf = qf.subselectQuery(Task.SObjectType);
		childQf.assertIsAccessible();
		childQf.setEnforceFLS(true);
		childQf.selectField('Id');
		QueryFactory childQf2 = qf.subselectQuery(Task.SObjectType);
		List<QueryFactory> queries = qf.getSubselectQueries();
		System.assert(queries != null);
		System.assert(queries.size() == 1);
	}

	@isTest
	static void addChildQueries_invalidChildRelationship(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		qf.selectField('email');
		qf.setCondition( 'name like \'%test%\'' );
		qf.addOrdering( new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) ).addOrdering( 'CreatedDATE',QueryFactory.SortOrder.DESCENDING);
		Schema.DescribeSObjectResult descResult = Account.SObjectType.getDescribe();
        Exception e;
		try {
			QueryFactory childQf = qf.subselectQuery(Contact.SObjectType);
			childQf.selectField('Id');
		} catch (QueryFactory.InvalidSubqueryRelationshipException ex) {
			e = ex;
		}
		System.assertNotEquals(e, null);
	}

	@isTest
	static void addChildQueries_invalidChildRelationshipTooDeep(){
		Account acct = new Account();
		acct.Name = 'testchildqueriesacct';
		insert acct;
		Contact cont = new Contact();
		cont.FirstName = 'test';
		cont.LastName = 'test';
		cont.AccountId = acct.Id;
		insert cont;
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.selectField('name');
		qf.selectField('email');
		qf.setCondition( 'name like \'%test%\'' );
		qf.addOrdering( new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) ).addOrdering('CreatedDATE',QueryFactory.SortOrder.DESCENDING);
		Schema.DescribeSObjectResult descResult = Contact.SObjectType.getDescribe();

		QueryFactory childQf = qf.subselectQuery(Task.SObjectType);
		childQf.selectField('Id');
		childQf.selectField('Subject');
		Exception e;
		try {
			QueryFactory subChildQf = childQf.subselectQuery(Task.SObjectType);
		} catch (QueryFactory.InvalidSubqueryRelationshipException ex) {
			e = ex;
		}
		System.assertNotEquals(e, null);
	}

	@isTest
	static void checkFieldObjectReadSort_success(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.assertIsAccessible()
		  .setEnforceFLS(true)
		  .selectField('createdby.name')
		  .selectField(Contact.LastModifiedById)
		  .selectFields(new List<SObjectField>{Contact.LastModifiedDate})
		  .setEnforceFLS(false)
		  .selectField(Contact.LastName)
		  .selectFields(new List<SObjectField>{Contact.Id})
		  .setCondition( 'name like \'%test%\'' )
		  .setEnforceFLS(true)
		  .selectFields(new Set<SObjectField>{Contact.FirstName})
		  .addOrdering(new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) )
		  .addOrdering(Contact.LastModifiedDate,QueryFactory.SortOrder.DESCENDING)
		  .addOrdering(Contact.CreatedDate,QueryFactory.SortOrder.DESCENDING, true);
		Set<QueryFactory.QueryField> fields = qf.getSelectedFields();
		QueryFactory.Ordering ordering = new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING);
		ordering.getFields();
		for (QueryFactory.QueryField qfRow : fields) {
			SObjectField fld = qfRow.getBaseField();
			List<SObjectfield> flds = qfRow.getFieldPath();
			break;
		}
		System.assert(qf.toSOQL().containsIgnoreCase('NULLS LAST'));
	}

	@isTest
	static void checkObjectRead_fail(){
		User usr = createTestUser_noAccess();
		if (usr != null){
			System.runAs(usr){
				//create a query factory object for Account.
				QueryFactory qf = new QueryFactory(Account.SObjectType);
				Boolean excThrown = false;
				try {
					//check to see if this record is accessible, it isn't.
					qf.assertIsAccessible();
				} catch (SecurityUtils.CrudException e) {
					excThrown = true;
				}
				System.assert(excThrown);
			}
		}
	}

	@isTest
	static void checkFieldRead_fail(){
		User usr = createTestUser_noAccess();
		if (usr != null){
			System.runAs(usr){
				//create a query factory object for Account.
				QueryFactory qf = new QueryFactory(Account.SObjectType);
				Boolean excThrown = false;
				try {
					//set field to enforce FLS, then try to add a field.
					qf.setEnforceFLS(true);
					qf.selectField('Name');
				} catch (SecurityUtils.FlsException e) {
					excThrown = true;
				}
				System.assert(excThrown);
			}
		}
	}

	@isTest
	static void queryWith_noFields(){
		QueryFactory qf = new QueryFactory(Contact.SObjectType);
		qf.assertIsAccessible().setEnforceFLS(true).setCondition( 'name like \'%test%\'' ).addOrdering('CreatedDate',QueryFactory.SortOrder.DESCENDING);
		String query = qf.toSOQL();
		System.assert(query.containsIgnoreCase('Id FROM'));
	}

	@isTest
	static void queryField_compareTo(){
		String otherType = 'bob';
		QueryFactory.QueryField qf = new QueryFactory.QueryField(Contact.SObjectType.fields.Name);
		QueryFactory.QueryField joinQf = new QueryFactory.QueryField(new List<Schema.SObjectField>{
			Contact.SObjectType.fields.LastModifiedById,
			Account.SObjectType.fields.OwnerId,
			User.SObjectType.fields.Name
		});
		QueryFactory.QueryField otherJoinQf = new QueryFactory.QueryField(new List<Schema.SObjectField>{
			Contact.SObjectType.fields.AccountId,
			Account.SObjectType.fields.CreatedById,
			User.SObjectType.fields.Name
		});
		System.assertEquals(-2, qf.compareTo(otherType));
		System.assertEquals(0, qf.compareTo(qf));
		System.assertEquals(
			0,
			qf.compareTo(new QueryFactory.QueryField(Contact.SObjectType.fields.Name)),
			'An equal but non-identical instance should return 0'
		);
		System.assertEquals(-1 , qf.compareTo(joinQf));
		System.assertEquals(1, joinQf.compareTo(qf));
		System.assert(joinQf.compareTo(otherJoinQf) > 0);
		System.assert(otherJoinQf.compareTo(joinQf) < 0);
	}

	@isTest
	static void deterministic_toSOQL(){
		QueryFactory qf1 = new QueryFactory(User.SObjectType);
		QueryFactory qf2 = new QueryFactory(User.SObjectType);
		for(QueryFactory qf:new Set<QueryFactory>{qf1,qf2}){
			qf.selectFields(new List<String>{
				'Id',
				'FirstName',
				'LastName',
				'CreatedBy.Name',
				'CreatedBy.Manager',
				'LastModifiedBy.Email'
			});
		}
		String expectedQuery =
			'SELECT '
			+'FirstName, Id, LastName, ' //less joins come first, alphabetically
			+'CreatedBy.ManagerId, CreatedBy.Name, LastModifiedBy.Email ' //alphabetical on the same number of joinrs'
			+'FROM User';
		System.assertEquals(qf1.toSOQL(), qf2.toSOQL());
		System.assertEquals(expectedQuery, qf1.toSOQL());
		System.assertEquals(expectedQuery, qf2.toSOQL());
	}

	@isTest
	static void deepCloneBasicNoChanges() {
		QueryFactory qf = new QueryFactory(Contact.SObjectType)
		.setLimit(10)
		.setCondition('id=12345')
		.selectField('Description')
		.addOrdering(new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) )
		.addOrdering( new QueryFactory.Ordering('Contact','CreatedDATE',QueryFactory.SortOrder.DESCENDING))
		.setEnforceFLS(true);

		QueryFactory qf2 = qf.deepClone();

		System.assertEquals(qf2, qf);

		System.assertEquals(qf.getLimit(), qf2.getLimit());
		System.assertEquals(qf.getCondition(), qf2.getCondition());
		System.assertEquals(qf.toSOQL(), qf2.toSOQL());
		System.assertEquals(qf.getOrderings(), qf2.getOrderings());
	}

	@isTest
	static void deepCloneSubqueryNoChanges() {
		QueryFactory qf = new QueryFactory(Account.SObjectType)
		.setLimit(10)
		.setCondition('id=12345')
		.selectField('Description')
		.addOrdering(new QueryFactory.Ordering('Account','Name',QueryFactory.SortOrder.ASCENDING) )
		.addOrdering( new QueryFactory.Ordering('Account','Description',QueryFactory.SortOrder.DESCENDING))
		.setEnforceFLS(true);

		qf.subselectQuery('Contacts', true);

		QueryFactory qf2 = qf.deepClone();

		System.assertEquals(qf, qf2);

		System.assertEquals(qf.getLimit(), qf2.getLimit());
		System.assertEquals(qf.getCondition(), qf2.getCondition());
		System.assertEquals(qf.toSOQL(), qf2.toSOQL());
		System.assertEquals(qf.getOrderings(), qf2.getOrderings());
		System.assertEquals(qf.getSubselectQueries(), qf2.getSubselectQueries());
	}

	@isTest
	static void deepCloneBasic() {
		QueryFactory qf = new QueryFactory(Contact.SObjectType)
		.setLimit(10)
		.setCondition('id=12345')
		.selectField('Description')
		.addOrdering(new QueryFactory.Ordering('Contact','name',QueryFactory.SortOrder.ASCENDING) )
		.addOrdering( new QueryFactory.Ordering('Contact','CreatedDATE',QueryFactory.SortOrder.DESCENDING))
		.setEnforceFLS(true);


		QueryFactory qf2 = qf.deepClone()
			.setLimit(200)
			.setCondition('id=54321')
			.selectField('Fax')
			.addOrdering( new QueryFactory.Ordering('Contact','Fax',QueryFactory.SortOrder.ASCENDING))
			.setEnforceFLS(false);

		qf2.getOrderings().remove(0);

		System.assertEquals(10, qf.getLimit());
		System.assertEquals(200, qf2.getLimit());

		System.assertEquals('id=12345', qf.getCondition());
		System.assertEquals('id=54321', qf2.getCondition());

		String query = qf.toSOQL();
		String query2 = qf2.toSOQL();

		System.assert(query.containsIgnoreCase('Fax') == false);
		System.assert(query.containsIgnoreCase('Description'));
		System.assert(query2.containsIgnoreCase('Description'));
		System.assert(query2.containsIgnoreCase('Fax'));

		System.assertEquals(2, qf.getOrderings().size());
		System.assertEquals(Contact.name, qf.getOrderings()[0].getField() );
		System.assertEquals(QueryFactory.SortOrder.DESCENDING, qf.getOrderings()[1].getDirection());

		System.assertEquals(2, qf2.getOrderings().size());
		System.assertEquals(Contact.Fax, qf2.getOrderings()[1].getField());
		System.assertEquals(QueryFactory.SortOrder.ASCENDING, qf2.getOrderings()[1].getDirection());

	}

	@isTest
	static void deepCloneSubquery() {
		QueryFactory qf = new QueryFactory(Account.SObjectType);
		qf.subselectQuery('Contacts', true);

		QueryFactory qf2 = qf.deepClone();
		qf2.subselectQuery('Opportunities', true);

		List<QueryFactory> subqueries = qf.getSubselectQueries();
		List<QueryFactory> subqueries2 = qf2.getSubselectQueries();

		QueryFactory subquery2_0 = subqueries2.get(0);

		subquery2_0.addOrdering(new QueryFactory.Ordering('Contact','Name',QueryFactory.SortOrder.ASCENDING));

		System.assert(subqueries.size() == 1);
		System.assert(subqueries2.size() == 2);

		System.assert(qf.getSubselectQueries().get(0).getOrderings().size() == 0);
		System.assert(qf2.getSubselectQueries().get(0).getOrderings().size() == 1);
	}

	public static User createTestUser_noAccess(){
		User usr;
		try {
			//look for a profile that does not have access to the Account object
			PermissionSet ps =
			[SELECT Profile.Id, profile.name
				FROM PermissionSet
				WHERE IsOwnedByProfile = true
				AND Profile.UserType = 'Standard'
				AND Id NOT IN (SELECT ParentId
				               FROM ObjectPermissions
				               WHERE SObjectType = 'Account'
				               AND PermissionsRead = true)
				LIMIT 1];

			if (ps != null){
				//create a user with the profile found that doesn't have access to the Account object
				usr = new User(
				    firstName = 'testUsrF',
				    LastName = 'testUsrL',
				    Alias = 'tstUsr',
				    Email = 'testy.test@test.com',
				    UserName='test'+ Math.random().format()+'user99@test.com',
				    EmailEncodingKey = 'ISO-8859-1',
				    LanguageLocaleKey = 'en_US',
				    TimeZoneSidKey = 'America/Los_Angeles',
				    LocaleSidKey = 'en_US',
				    ProfileId = ps.Profile.Id,
				    IsActive=true
				    );
				insert usr;
			}
		} catch (Exception e) {
			//do nothing, just return null User because this test case won't work in this org.
			return null;
		}
		return usr;
	}
}