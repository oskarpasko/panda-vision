using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Menu : MonoBehaviour
{
    void Start()
    {

    }

    void Update()
    {

    }

    public void ColorTestDescription()
    {
        Debug.Log("INFO - Opis testu kolorów");
    }

    public void ColorTestStart()
    {
        Debug.Log("INFO - Przejście do sceny z testem kolorów");
    }

    public void ColorCubeTestDescription()
    {
        Debug.Log("INFO - Opis testu kolorów");
    }

    public void ColorCubeTestStart()
    {
        SceneManager.LoadScene("TestScene");
    }
}
