module.exports = ({ admin }) => `
 <html>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
  />
  <body style="font-family: Verdana">
     <div  class="container text-center">
      <img
        src="http://hourhub.se/Hourhub.png"
        style="width: 100%"
      />
      <h3>Hej</h3>
      <p>
        ${admin.name} har lagt nya schema för 
        ${admin.companyName}
      </p>
      <p>
        Vänligen logga in och kolla.
      </p>
        <a
          class="waves-effect waves-light btn" 
          href="https://hourhub.se/"
          style="
          background-color: #f377ab;
          font-family: Verdana;
          padding: 12px 24px;
          border-radius: 9px;
          color: #fff;
        "
        >
          Logga in
        </a>

      <p>Med vänlig hälsning</p>
      <p>hourhub.se</p>
    </div>
  </body>
</html>

  `;
