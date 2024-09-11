using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class test : MonoBehaviour
{
    [SerializeField] private GameObject button;

    private void OnCollisionEnter(Collision other) {
        if(other.gameObject.name.Equals("0"))
        {
            Color32 colorToCavas = new Color32(255,0,0,255);
            button.GetComponent<Renderer>().material.color = colorToCavas;
        }
    }

    private void OnCollisionExit(Collision other) {
        Color32 colorToCavas = new Color32(0,255,0,255);
        button.GetComponent<Renderer>().material.color = colorToCavas;
    }
}

