using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginCanvas"> Przechowujemy obiekt Canvasa logowania </param>
	/// <param name="menuCanvas"> Przechowujemy obiekt Canvasa menu głównego </param>
	/// <param name="loginButton"> Przechowujemy obiekt naszego przycisku </param>
	/// <param name="emailField"> Field przechowujący wpisany email </param>
	/// <param name="passwordField"> Field przechpwujący wpisane hasło </param>
	/// <param name="url"> URL do serwera Flask </param>
	[SerializeField] private GameObject loginCanvas;
	[SerializeField] private GameObject menuCanvas;
	[SerializeField] private Button loginButton;
	[SerializeField] private InputField emailField;
	[SerializeField] private InputField passwordField;
	[SerializeField] private GameObject loginError;
	private string url = "http://192.168.0.165:5000/";
	void Start() { loginButton.onClick.AddListener(LoginButtonClicked);}

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