using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Menu : MonoBehaviour
{
    [SerializeField] private GameObject testColorDescButton;
    [SerializeField] private GameObject testTwoColorDescButton;
    [SerializeField] private GameObject testColorCubeDescButton;
    [SerializeField] private GameObject ishiharaDescButton;

    // method which shows description ob Color Test
    public void ColorTestDescription()
    {
        testColorCubeDescButton.SetActive(false);
        ishiharaDescButton.SetActive(false);
        testTwoColorDescButton.SetActive(false);
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
        testTwoColorDescButton.SetActive(false);
        testColorCubeDescButton.SetActive(true);
    }

    // method which starts Color Cube Test Scene
    public void ColorCubeTestStart()
    {
        SceneManager.LoadScene("ColorCubeTestScene");
    }

    // method which starts Color Cube Tutorial
    public void ColorCubeTutorialStart()
    {
        SceneManager.LoadScene("ColorCubeTutorial");
    }

    // method which shows description ob Ishihara Test
    public void IshiharaTestDescription()
    {
        testColorDescButton.SetActive(false);
        testColorCubeDescButton.SetActive(false);
        testTwoColorDescButton.SetActive(false);
        ishiharaDescButton.SetActive(true);
    }

    // method which starts Ishihara Scene
    public void IshiharaTestStart()
    {
        SceneManager.LoadScene("IshiharaTest");
    }

    // method which starts Ishihara Tutorial
    public void IshiharaTutorialStart()
    {
        SceneManager.LoadScene("IshiharaTutorial");
    }

    // method which shows description of Two Color Test
    public void TwoColorTestDescription()
    {
        testColorCubeDescButton.SetActive(false);
        ishiharaDescButton.SetActive(false);
        testColorDescButton.SetActive(false);
        testTwoColorDescButton.SetActive(true);
    }

    // method which starts Color Test Scene
    public void TwoColorTestStart()
    {
        SceneManager.LoadScene("TwoColorTestScene");
    }
}
