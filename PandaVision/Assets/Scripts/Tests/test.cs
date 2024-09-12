using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class test : MonoBehaviour
{
    [SerializeField] private GameObject button;
    [SerializeField] private int ButtonNumber;

    private string[] reds = new string[5];
    private string[] greens = new string[5];
    private string[] blues = new string[5];

    private void Start() {
        SetCubesNames();
    }

    void OnCollisionStay(Collision other) {
    //Loop through the buttons array
    // Check if the colliding object's name matches the name in the reds array
    if (other.gameObject.name.Equals(reds[ButtonNumber-1])) 
    {
        // Change the button's color to blue
        button.GetComponent<Renderer>().material.color = new Color32(0, 0, 255, 255);
    }
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
