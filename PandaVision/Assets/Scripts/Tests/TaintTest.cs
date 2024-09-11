using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class TaintTest : MonoBehaviour
{
    public float deadTime = 1.0f;
    private bool _deadTimeActive = false;
    public UnityEvent onPressed, onRealsed;
    [SerializeField] private GameObject button;
    [SerializeField] private GameObject[] cubes;

    private void Start() {
        GenerateColorsForCubes();
    }

    // method to generate colors for the cubes
    void GenerateColorsForCubes()
    {
        ShuffleCubes(cubes);

        for (int i = 0; i < cubes.Length; i++)
        {
            int x = 0 + (25 * i);
            
            cubes[i].GetComponent<Renderer>().material.color = new Color32(255,Convert.ToByte(x),Convert.ToByte(x),255);
            cubes[i].name = x.ToString();
            Debug.Log(!cubes[i].gameObject.name.Equals("0"));

            if(i == (cubes.Length-2)) cubes[i].GetComponent<Renderer>().material.color = new Color32(100,255,100,255);
            if(i == (cubes.Length-1)) cubes[i].GetComponent<Renderer>().material.color = new Color32(100,100,255,255);
        }
    }

    // method do suffle the cubes
    void ShuffleCubes(object[] array)
    {
        for (int i = array.Length - 1; i > 0; i--)
        {
            int rnd = UnityEngine.Random.Range(0, i + 1);
            object temp = array[i];
            array[i] = array[rnd];
            array[rnd] = temp;
        }
    }
}