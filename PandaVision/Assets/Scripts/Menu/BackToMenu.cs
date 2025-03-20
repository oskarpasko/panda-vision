using UnityEngine;
using UnityEngine.SceneManagement;

public class BackToMenu : MonoBehaviour
{
    // method which move user to the menu page (LoginScene)
    public void BackToMenuAction()
    {
        SceneManager.LoadScene("LoginScene");
    }
}
