using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginButton"> Przechowujemy obiekt naszego przycisku </param>
	public Button loginButton;
	public InputField emailField;
	public InputField passwordField;
	void Start () {
		loginButton.onClick.AddListener(LoginButtonClicked);
	}

	void LoginButtonClicked (){

		if(emailField.text == "admin" && passwordField.text == "admin"){
			//przejście do nastepnej sceny
			SceneManager.LoadScene("TestScene");
		}
	}
}