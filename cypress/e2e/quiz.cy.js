describe('Get Random questions', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:3001//');
    });
  
    it('should return a question with the answer data', () => {
        cy.fixture('questions').then((fixture) => {
          cy.intercept('GET', '/api/questions/random', {
            statusCode: 201,
            body: fixture
          }).as('mockPostRequest');
        });
      cy.get('div').eq(2).children().eq(0).click();
      cy.wait('@mockPostRequest').then((intercept) => {
        assert.isNotNull(intercept.response?.body, '1st API call has data');
        // Uncomment below to see the response body from mocked API call.
        console.log(intercept.response?.body);
        expect(intercept.response?.body[0].answers[0]).to.have.property('isCorrect', false);
      })
    })
  });