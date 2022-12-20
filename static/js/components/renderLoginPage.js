export function renderLoginPage() {
    const header = document.getElementById("header-nav");
    header.innerHTML = `
       <h1 id='title'>TRIVIAL</h1>
       <input type="text" name="email" id="email-field" class="login-form-field" placeholder="Email">
       <input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
       <input type="submit" value="Login" id="login-form-submit">

       <input type="submit" value="Sign Up" id="test-form-submit">
       <input type="submit" value="Guest Login" id="test-form-submit">
      `;

      
  }