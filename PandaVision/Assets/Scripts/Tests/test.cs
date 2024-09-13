using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;

public class test : MonoBehaviour
{
    [SerializeField] private GameObject button;
    [SerializeField] private int ButtonNumber;
    [SerializeField] private Button endingButton;
    [SerializeField] private TMP_Text errorsMessage;

    private string[] reds = new string[5];
    private string[] greens = new string[5];
    private string[] blues = new string[5];
    private int errors = 0;

    private void Start() {
        SetCubesNames();
        endingButton.onClick.AddListener(EndTest);
    }

    void OnCollisionStay(Collision other) {
        // Check if the colliding object's name matches the name in the reds array
        if (other.gameObject.name != reds[ButtonNumber-1]) errors++;
    }

    void OnCollisionExit(Collision other) {
        // Check if the colliding object's name matches the name in the reds array
        if (other.gameObject.name != reds[ButtonNumber-1]) errors--;
    }

    void EndTest()
    {
        errorsMessage.text += errors;
    }

    // method to set names for buttons to check later cubes
    private void SetCubesNames()
    {
        for (int i = 0; i < 5; i++)
        {
            int x = 0 + (45 * i);
            reds[i] = $"255{x}{x}";
            greens[i] = $"{x}255{x}";
            blues[i] = $"{x}{x}255";
        }
    }
}
