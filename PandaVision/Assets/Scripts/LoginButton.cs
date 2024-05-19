using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginButton"> Przechowujemy obiekt naszego przycisku </param>
	/// <param name="emailField"> Field przechowujący wpisany email </param>
	/// <param name="passwordField"> Field przechpwujący wpisane hasło </param>
	/// <param name="url"> URL do serwera Flask </param>
	public Button loginButton;
	public InputField emailField;
	public InputField passwordField;
	public GameObject loginError;
	private string url = "http://192.168.0.165:5000/";
	void Start() { loginButton.onClick.AddListener(LoginButtonClicked); }

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
				if(webRequest.responseCode == 200){
					SceneManager.LoadScene("TestScene");
				} else {
					// OBSŁUŻYĆ JEŚLI SĄ NIEPORPAWNE DANE
					loginError.SetActive(true);
					Debug.Log("Niepoprawne dane");
				} 
			}
		}
	}
}