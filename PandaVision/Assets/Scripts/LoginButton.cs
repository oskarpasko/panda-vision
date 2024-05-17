using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class LoginButton : MonoBehaviour {
	
	/// <param name="loginButton"> Przechowujemy obiekt naszego przycisku </param>
	public Button loginButton;
	void Start () {
		loginButton.onClick.AddListener(LoginButtonClicked);
	}

	void LoginButtonClicked (){

		//przejście do nastepnej sceny
		SceneManager.LoadScene("TestScene");
	}
}