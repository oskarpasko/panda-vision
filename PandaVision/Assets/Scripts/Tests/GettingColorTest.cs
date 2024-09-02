using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using Newtonsoft.Json;
using System;

public class GettingColorTest : MonoBehaviour
{
    [SerializeField] private Image colorCanvas;

    // Mehtod to get colors from db
    IEnumerator GetColor()
    {
        UnityWebRequest www = UnityWebRequest.Get("http://192.168.0.166:5000/color_test"); // connect with db
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success) // checking connection
        {
            Debug.LogError(www.error);
        }
        else
        {
            string json = www.downloadHandler.text; // downloanding whole json file from API

            // deserialize JSON to List of Lists of objects
            List<List<object>> colors = JsonConvert.DeserializeObject<List<List<object>>>(json);

            // Convert List of Lists to 2D array
            int rows = colors.Count;
            int cols = colors[0].Count;
            object[,] colorsArray2D = new object[rows, cols];

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    colorsArray2D[i, j] = colors[i][j];
                }
            }
            
            // setting color from DB
            Color32 colorToCavas = new Color32(Convert.ToByte(colorsArray2D[0, 0]),        // Red
                                               Convert.ToByte(colorsArray2D[0, 1]),        // Green
                                               Convert.ToByte(colorsArray2D[0, 2]),        // Blue
                                               255                         // Alpha
            );

            colorCanvas.color = colorToCavas;

            // Output in Console
            // DebugLog2DArray(colorsArray2D);
        }
    }

    // Method to output array in console
    void DebugLog2DArray(object[,] array2D)
    {
        int rows = array2D.GetLength(0);
        int cols = array2D.GetLength(1);

        for (int i = 0; i < rows; i++)
        {
            string row = "";
            for (int j = 0; j < cols; j++)
            {
                row += array2D[i, j] + ", ";
            }
            Debug.Log(row);
        }
    }

    // Main method
    IEnumerator Start()
    {
        yield return StartCoroutine(GetColor());

        // foreach (var item in colors)
        // {
        //     Debug.Log($"ID: {item.id}, Red: {item.red}, Green: {item.green}, Blue: {item.blue}, Poprawna: {item.correctAnswer}, A: {item.incrorrectAnswerA}, B: {item.incrorrectAnswerB}, C: {item.incrorrectAnswerC}");
        // }
    }
}
