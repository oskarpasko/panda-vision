using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LogOut : MonoBehaviour
{
    /// <param name="loginCanvas"> Storing object of login canvas </param>
	/// <param name="menuCanvas"> Storing object of main menu canvas </param>
    [SerializeField] private GameObject loginCanvas;
	[SerializeField] private GameObject menuCanvas;
    public void LogOutAction()
    {
        LoggedEmail.loggedUserEmail = null;
        menuCanvas.SetActive(false);
        loginCanvas.SetActive(true);
    }
}
