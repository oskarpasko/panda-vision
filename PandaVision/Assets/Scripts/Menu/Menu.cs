using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Menu : MonoBehaviour
{
    [SerializeField] private GameObject testColorDescButton;
    [SerializeField] private GameObject testColorCubeDescButton;

    // method which shows description ob Color Test
    public void ColorTestDescription()
    {
        testColorCubeDescButton.SetActive(false);
        testColorDescButton.SetActive(true);
    }

    // method which starts Color Test Scene
    public void ColorTestStart()
    {
        Debug.Log("INFO - Przejście do sceny z testem kolorów");
    }

    // method which shows description ob Color Cube Test
    public void ColorCubeTestDescription()
    {
        testColorDescButton.SetActive(false);
        testColorCubeDescButton.SetActive(true);
    }

    // method which starts Color Cube Test Scene
    public void ColorCubeTestStart()
    {
        SceneManager.LoadScene("TestScene");
    }
}
