describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {

    const longoTexto = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 3)

    cy.get('#firstName').type('Jeferson')
    cy.get('#lastName').type('Eugenio')
    cy.get('#email').type('jefy@gmail.com')
    cy.get('#phone').type('987654321')

    cy.get('#open-text-area').type(longoTexto, { delay: 0 })

    cy.contains('.button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    // cy.get('.success').should('exist')
    
    // cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Jeferson')
    cy.get('#lastName').type('Eugenio')
    cy.get('#email').type('jefygmail.com')
    cy.get('#phone').type('987654321')

    cy.get('#open-text-area').type('Teste')

    cy.contains('.button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    
    cy.get('#phone')
      .type('abcdf')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('#firstName').type('Jeferson')
    cy.get('#lastName').type('Eugenio')
    cy.get('#email').type('jefy@gmail.com')

    cy.get('#phone-checkbox').check()

    cy.get('#open-text-area').type('Teste torna obrigatorio campo telefone')

    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName').type('Jeferson').should('have.value', 'Jeferson').clear().should('have.value', '')
    cy.get('#lastName').type('Eugenio').should('have.value', 'Eugenio').clear().should('have.value', '')
    cy.get('#email').type('jefy@gmail.com').should('have.value', 'jefy@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('987654321').should('have.value', '987654321').clear().should('have.value', '')
    cy.get('#open-text-area').type('Teste limpa campo')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    
    // cy.fillMandatoryFieldsAndSubmit1()

    const data = {
      firstName: 'Jeferson2',
      lastName: 'Eugenio',
      email: 'jefy@gmail.com',
      text: 'texto de teste 2'
    }
    // cy.fillMandatoryFieldsAndSubmit2(data)

    cy.fillMandatoryFieldsAndSubmit3()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    
  })

  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product').select(1).should('have.value', 'blog')
    
  })

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('[type="radio"][value="feedback"]').check().should('be.checked')

  })

  it('marca cada tipo de atendimento', () => {

    cy.get('[type="radio"]')
      .each(typeofService => {
        cy.wrap(typeofService).check().should('be.checked')
      })

  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('./cypress/e2e/word.txt')
      .should(input => {
        // console.log(input)
         expect(input[0].files[0].name).to.equal('word.txt')
      })
  })  
  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('./cypress/e2e/word.txt', {action: 'drag-drop'})
      .should(input => {
         expect(input[0].files[0].name).to.equal('word.txt')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('word.txt').as('arquivo')
    cy.get('#file-upload').selectFile('@arquivo')
      .should(input => {
         expect(input[0].files[0].name).to.equal('word.txt')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    // cy.get('[href="privacy.html"]').should('have.attr', 'target', '_blank')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    // cy.get('[href="privacy.html"]').invoke('removeAttr', 'target').click()
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    
  })

  //   cy.get('#open-text-area').type('Teste de mensagem')
    
  //   cy.get('#file-upload').selectFile('./cypress/e2e/word.txt')
    
  //   cy.contains('.button', 'Enviar').click()
    
  //   cy.get('[class="success"]').should('be.visible', 'Mensagem enviada com sucesso.')
  // })


})