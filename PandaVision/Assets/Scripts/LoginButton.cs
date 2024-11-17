using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginCanvas"> Storing object of login canvas </param>
	/// <param name="menuCanvas"> Storing object of main menu canvas </param>
	/// <param name="loginButton"> Storing object of login button </param>
	/// <param name="usernameField"> Storing object of username </param>
	/// <param name="passwordField"> Storing object of password </param>
	/// <param name="url"> URL to Flask server </param>
	[SerializeField] private GameObject loginCanvas;
	[SerializeField] private GameObject menuCanvas;
	[SerializeField] private Button loginButton;
	[SerializeField] private InputField usernameField;
	[SerializeField] private InputField passwordField;
	[SerializeField] private GameObject loginError;
	private string url = ApiUrl.Apiurl;
	void Start() { 

		// we are checking if user was logged or not
		// if user was logged then loogedUserEmail equals his email
		// and then we will show menu canvas
		// if user was not logged then loogedUserEmail is null
		// and then we will show login canvas
		if(LoggedUsername.loggedUserName == null)
		{
			loginButton.onClick.AddListener(LoginButtonClicked);
		} else {
			loginCanvas.SetActive(false);
			menuCanvas.SetActive(true);
		}
	}

	void LoginButtonClicked(){ StartCoroutine(LoginRequest(usernameField.text, passwordField.text)); }
	IEnumerator LoginRequest(string username, string password) {
		// prepare form
		WWWForm form = new WWWForm();
        form.AddField("username", username);
        form.AddField("password", password);

		// connection to the flask
		using (UnityWebRequest webRequest = UnityWebRequest.Post(url, form)) {
			yield return webRequest.SendWebRequest();

			if(webRequest.isNetworkError){
				Debug.Log("ERROR: " + webRequest.error);
			} else {
				// if email and password are correct
				if(webRequest.responseCode == 200){
					LoggedUsername.loggedUserName = usernameField.text; // we set loggedUserEmail as the user email
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