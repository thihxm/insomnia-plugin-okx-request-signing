module.exports = {
  title: 'OKX API keys config missing',
  message: `
    <div class="pad">
      You need to create a new <a href="https://support.insomnia.rest/article/18-environment-variables">environment variable</a> like this:
      <p>
      <pre>
      "OKX_CONFIG": {
        "API_KEY": "my-api-key",
        "SECRET_KEY": "my-secret-key",
        "PASSPHRASE": "my-api-passphrase"
      }
      </pre>
      </p>
      <ul>
      <li>* Replace "<i>my-api-key</i>" with the API Key.</li>
      <li>* Replace "<i>my-secret-key</i>" with the Secret Key.</li>
      <li>* Replace "<i>my-api-passphrase</i>" with the Passphrase.</li>
      </ul>
      <p>Have a look at the <a href="https://www.okx.com/account/my-api">Official OKX API creation page</a> to see how to setup an API Key.</p>
    </div>
  `,
}
