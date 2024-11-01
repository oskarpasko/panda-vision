using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class TaintTest : MonoBehaviour
{
    /// <param name="cubes"> Array with cubes for the test </param>
    [SerializeField] private GameObject[] cubes;

    private void Start() {
        GenerateColorsForCubes();
    }

    // method to generate colors for the cubes
    void GenerateColorsForCubes()
    {
        // Shuffle the cubes 
        ShuffleCubes(cubes);

        for (int i = 0; i < cubes.Length/3; i++)
        {
            int x = 0 + (45 * i); 
            // Set red colors for 5 cubes
            cubes[i].GetComponent<Renderer>().material.color = new Color32(255,
                                                                           Convert.ToByte(x),
                                                                           Convert.ToByte(x),
                                                                           255);
            cubes[i].name = $"255{x}{x}";
            // Set green colors for 5 cubes
            cubes[i+5].GetComponent<Renderer>().material.color = new Color32(Convert.ToByte(x),
                                                                             255,
                                                                             Convert.ToByte(x),
                                                                             255);
            cubes[i+5].name = $"{x}255{x}";
            // Set blue color for 5 cubes
            cubes[i+10].GetComponent<Renderer>().material.color = new Color32(Convert.ToByte(x),
                                                                              Convert.ToByte(x),
                                                                              255,
                                                                              255);
            cubes[i+10].name = $"{x}{x}255";
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