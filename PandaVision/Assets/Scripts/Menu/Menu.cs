using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Menu : MonoBehaviour
{
    [SerializeField] private GameObject testColorDescButton;
    [SerializeField] private GameObject testColorCubeDescButton;
    [SerializeField] private GameObject ishiharaDescButton;

    // method which shows description ob Color Test
    public void ColorTestDescription()
    {
        testColorCubeDescButton.SetActive(false);
        ishiharaDescButton.SetActive(false);
        testColorDescButton.SetActive(true);
    }

    // method which starts Color Test Scene
    public void ColorTestStart()
    {
        SceneManager.LoadScene("ColorTestScene");
    }

    // method which shows description ob Color Cube Test
    public void ColorCubeTestDescription()
    {
        testColorDescButton.SetActive(false);
        ishiharaDescButton.SetActive(false);
        testColorCubeDescButton.SetActive(true);
    }

    // method which starts Color Cube Test Scene
    public void ColorCubeTestStart()
    {
        SceneManager.LoadScene("ColorCubeTestScene");
    }

    // method which shows description ob Ishihara Test
    public void IshiharaTestDescription()
    {
        testColorDescButton.SetActive(false);
        testColorCubeDescButton.SetActive(false);
        ishiharaDescButton.SetActive(true);
    }

    // method which starts Color Ishihara Scene
    public void IshiharaTestStart()
    {
        SceneManager.LoadScene("IshiharaTest");
    }
}
