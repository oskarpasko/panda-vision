using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginCanvas"> Storing object of login canvas </param>
	/// <param name="menuCanvas"> Storing object of main menu canvas </param>
	/// <param name="loginButton"> Storing object of login button </param>
	/// <param name="emailField"> Storing object of email </param>
	/// <param name="passwordField"> Storing object of password </param>
	/// <param name="url"> URL to Flask server </param>
	[SerializeField] private GameObject loginCanvas;
	[SerializeField] private GameObject menuCanvas;
	[SerializeField] private Button loginButton;
	[SerializeField] private InputField emailField;
	[SerializeField] private InputField passwordField;
	[SerializeField] private GameObject loginError;
	private string url = "http://192.168.0.165:5000/";
	void Start() { 

		// we are checking if user was logged or not
		// if user was logged then loogedUserEmail equals his email
		// and then we will show menu canvas
		// if user was not logged then loogedUserEmail is null
		// and then we will show login canvas
		if(LoggedEmail.loggedUserEmail == null)
		{
			loginButton.onClick.AddListener(LoginButtonClicked);
		} else {
			loginCanvas.SetActive(false);
			menuCanvas.SetActive(true);
		}
	}

	void LoginButtonClicked(){ StartCoroutine(LoginRequest(emailField.text, passwordField.text)); }
	IEnumerator LoginRequest(string email, string password) {
		// prepare form
		WWWForm form = new WWWForm();
        form.AddField("email", email);
        form.AddField("password", password);

		// connection to the flask
		using (UnityWebRequest webRequest = UnityWebRequest.Post(url, form)) {
			yield return webRequest.SendWebRequest();

			if(webRequest.isNetworkError){
				Debug.Log("ERROR: " + webRequest.error);
			} else {
				// if email and password are correct
				if(webRequest.responseCode == 200){
					LoggedEmail.loggedUserEmail = emailField.text; // we set loggedUserEmail as the user email
					loginCanvas.SetActive(false);
					menuCanvas.SetActive(true);
				} else {// if email and password are incorrect
					loginError.SetActive(true);
					Debug.Log("Niepoprawne dane");
				} 
			}
		}
	}
}