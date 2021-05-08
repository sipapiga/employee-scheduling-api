module.exports = ({ user, companyName }) => `
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
      <h3>Hej ${user.name}</h3>
      <p>
        ${companyName} har lagt till dig som person i Hourhub.se för
        ${companyName}
      </p>
      <p>
        Ditt konto har nu skapats och är redo att användas. Innan du kommer
        igång behöver du skapa ett lösenord.
      </p>
        <div style="margin: 35px 0px">
          <a
            class="waves-effect waves-light btn" 
            href="https://hourhub.se/confirmation/${user._id}"
            style="
            background-color: #f377ab;
            font-family: Verdana;
            padding: 12px 24px;
            border-radius: 9px;
            color: #fff;
           "
          >
            Skapa ett lösenord
          </a>
        </div>
      <p>Med vänlig hälsning</p>
      <p>hourhub.se</p>
    </div>
  </body>
</html>

  `;
