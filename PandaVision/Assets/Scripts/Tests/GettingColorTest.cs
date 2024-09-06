using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using TMPro;

public class GettingColorTest : MonoBehaviour
{
    /// <param name="testPanel"> Canvas which is displaying colors for test </param>
    /// <param name="buttons"> list of buttons with answers </param>
    /// <param name="startButton"> button to start the test </param>
    /// <param name="tryAgainButton"> button to start once again the test </param>
    /// <param name="buttons"> list of buttons with answers </param>
    /// <param name="startCanvas"> Canvas with start button </param>
    /// <param name="colorCanvas"> Canvas with test's colors </param>
    /// <param name="answerCanvas"> Canvas with answers </param>
    /// <param name="resultCanvas"> Canvas with results </param>
    /// <param name="timeResult"> Text_TMP to write time from test </param>
    /// <param name="correctResult"> Text_TMP to write count of correct answers from test </param>
    /// <param name="errorsResult"> Text_TMP to write count of error answer score from test </param>
    /// <param name="proceed"> variable to work with waiting for click button </param>
    /// <param name="error"> variable to count errors in test, start with 0 </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] private Image testPanel;
    [SerializeField] private Button[] buttons;
    [SerializeField] private Button startButton;
    [SerializeField] private Button tryAgainButton;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private GameObject colorCanvas;
    [SerializeField] private GameObject answerCanvas;
    [SerializeField] private GameObject resultCanvas;
    [SerializeField] private TMP_Text timeResult;
    [SerializeField] private TMP_Text correctResult;
    [SerializeField] private TMP_Text errorsResult;
    private bool proceed;
    private int error = 0;
    private float time = 0f;
    private bool isRunning = false;

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
            startButton.onClick.AddListener(startTest); //listener to start button

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
                testPanel.color = colorToCavas;

                // adding answers for color to the simple array
                string[] answers = new string[4];
                for(int a = 3; a < 7; a++) { answers[a-3] = Convert.ToString(colorsArray2D[i, a]); }

                // get correct answer
                string correctAns = answers[0];

                // shuffle array with answers
                ShuffleAnswers(answers);
            
                // loop to set answers to all buttons where will be answers
                // adding listeners to all buttons as well
                for (int t = 0; t < buttons.Length; t++)
                {
                    buttons[t].onClick.RemoveAllListeners();
                    buttons[t].GetComponentInChildren<Text>().text = answers[t];
                    string guessAns = answers[t].ToString();
                    buttons[t].onClick.AddListener(() => OnButtonClick(correctAns, guessAns));
                }

                // Waiting for user click an some answer button
                while(!proceed)
                {
                    yield return null;
                }

                proceed = false;
            }
            isRunning = false; // stop counting time

            // hide canvas with colors
            // hide canvas with answers
            // show canvas with results
            colorCanvas.SetActive(false);
            answerCanvas.SetActive(false);
			resultCanvas.SetActive(true);
            timeResult.text = FormatTime(time).ToString();              // print test's time
            correctResult.text = (rows - error).ToString(); // print correct score
            errorsResult.text = error.ToString();           // print errors score
        }
    }

    // method to shuffle answers
    void ShuffleAnswers(string[] array)
    {
        for (int i = array.Length - 1; i > 0; i--)
        {
            int rnd = UnityEngine.Random.Range(0, i + 1);
            string temp = array[i];
            array[i] = array[rnd];
            array[rnd] = temp;
        }
    }
    // method to format time
    private string FormatTime(float time)
    {
        // get seconds 
        int seconds = Mathf.FloorToInt(time);
        // get milliseconds 
        int milliseconds = Mathf.FloorToInt((time - seconds) * 100);
        // return formatted string with seconds and milliseconds
        return string.Format("{0}.{1:00}", seconds, milliseconds);
    }
    // method which starts test after clicking button
    void startTest()
        {
            resultCanvas.SetActive(false);
            colorCanvas.SetActive(true);
            answerCanvas.SetActive(true);
            time = 0f; //reset the time
            isRunning = true; // start counting time
        }
        // method which starts test after clicking button
    void tryAgainTest()
        {
            startCanvas.SetActive(false);
            colorCanvas.SetActive(true);
            answerCanvas.SetActive(true);
            isRunning = true; // start counting time
        }
    // method to change proceed value
    void OnButtonClick(string correctAnswer, string guessAnswer)
    { 
        proceed = true; 
        // if guess is wrong add +1 to the error variable
        if(correctAnswer.Equals(guessAnswer) == false) { error++; }
    }
    // Main method
    IEnumerator Start()
    {
        proceed = false; 
        yield return StartCoroutine(GetColor());
    }

    void Update()
    {
        // if isRunning is true, keep adding time
        if (isRunning) { time += Time.deltaTime; }
    }
}
