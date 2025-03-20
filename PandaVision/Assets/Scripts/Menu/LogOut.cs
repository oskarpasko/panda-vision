using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LogOut : MonoBehaviour
{
    /// <param name="loginCanvas"> Storing object of login canvas </param>
	/// <param name="menuCanvas"> Storing object of main menu canvas </param>
	/// <param name="descCanvas"> Storing object of descriptions canvas </param>
    [SerializeField] private GameObject loginCanvas;
	[SerializeField] private GameObject menuCanvas;
    [SerializeField] private GameObject descCanvas;
    public void LogOutAction()
    {
        LoggedUsername.loggedUserName = null;
        menuCanvas.SetActive(false);
        descCanvas.SetActive(false);
        loginCanvas.SetActive(true);
    }
}
