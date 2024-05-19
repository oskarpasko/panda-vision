using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;
using UnityEngine.Networking;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginButton"> Przechowujemy obiekt naszego przycisku </param>
	public Button loginButton;
	public InputField emailField;
	public InputField passwordField;
	void Start () {

		StartCoroutine(GetRequest("http://192.168.0.165:5000/"));

		loginButton.onClick.AddListener(LoginButtonClicked);
	}

	void LoginButtonClicked (){

		if(emailField.text == "admin" && passwordField.text == "admin"){
			//przejście do nastepnej sceny
			SceneManager.LoadScene("TestScene");
		}
	}

	IEnumerator GetRequest(string url){
		using (UnityWebRequest webRequest = new UnityWebRequest(url)) {
			yield return webRequest.SendWebRequest();
			if(webRequest.isNetworkError){
				Debug.Log("ERROR: " + webRequest.error);
			} else {
				Debug.Log("You've connected with API!");
			}
		}
	}
}