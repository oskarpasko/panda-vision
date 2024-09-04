using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;

public class GettingColorTest : MonoBehaviour
{
    /// <param name="colorCanvas"> Canvas which is displaying colors for test </param>
    /// /// <param name="buttons"> list of buttons with answers </param>
    /// /// <param name="proceed"> variable to work with waiting for click button </param>
    [SerializeField] private Image colorCanvas;
    [SerializeField] private Button[] buttons;
    private bool proceed;

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

            // converting json file to the 2d array
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    colorsArray2D[i, j] = colors[i][j];
                }
            }

            // main test's loop
            for (int i = 0; i < rows; i++)
            {
                Debug.Log("+++++++++++++++++ ITERACJA: " + i);
                // setting color from DB
                Color32 colorToCavas = new Color32(Convert.ToByte(colorsArray2D[i, 0]),     // Red
                                                Convert.ToByte(colorsArray2D[i, 1]),        // Green
                                                Convert.ToByte(colorsArray2D[i, 2]),        // Blue
                                                255                                         // Alpha
                );
                colorCanvas.color = colorToCavas;

                // adding answers for color to the simple array
                string[] answers = new string[4];
                for(int a = 3; a < 7; a++) { answers[a-3] = Convert.ToString(colorsArray2D[i, a]); }
            
                // loop to set answers to all buttons where will be answers
                // adding listeners to all buttons as well
                for (int t = 0; t < buttons.Length; t++)
                {
                    buttons[t].GetComponentInChildren<Text>().text = answers[t];
                    buttons[t].onClick.AddListener(OnButtonClick);
                }

                // Waiting for user click an some answer button
                while(!proceed)
                {
                    yield return null;
                }

                proceed = false;
            }
        }
    }

    // method to change proceed value
    void OnButtonClick(){ proceed = true; }

    // Main method
    IEnumerator Start()
    {
        proceed = false; 

        yield return StartCoroutine(GetColor());
    }
}
