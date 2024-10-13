using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using TMPro;
using UnityEngine.SceneManagement;

public class IshiharaTest : MonoBehaviour
{
    /// <param name="testPanel"> Canvas which is displaying colors for test </param>
    /// <param name="startButton"> button to start the test </param>
    /// <param name="backToMenuButton"> button to back to the menu </param>
    /// <param name="buttons"> list of buttons with answers </param>
    /// <param name="startCanvas"> Canvas with start button </param>
    /// <param name="colorCanvas"> Canvas with test's colors </param>
    /// <param name="answerCanvas"> Canvas with answers </param>
    /// <param name="answerField"> Field with the answer </param>
    /// <param name="nextButton"> Button to get next image </param>
    /// <param name="resultCanvas"> Canvas with results </param>
    /// <param name="backToMenuCanvas"> Canvas with button to back to the manu </param>
    /// <param name="timeResult"> Text_TMP to write time from test </param>
    /// <param name="correctResult"> Text_TMP to write count of correct answers from test </param>
    /// <param name="errorsResult"> Text_TMP to write count of error answer score from test </param>
    /// <param name="proceed"> variable to work with waiting for click button </param>
    /// <param name="error"> variable to count errors in test, start with 0 </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] private Image testPanel;
    [SerializeField] private Texture2D[] images;
    [SerializeField] private String[] correctAnswers;
    [SerializeField] private Button startButton;
    [SerializeField] private Button backToMenuButton;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private GameObject colorCanvas;
    [SerializeField] private GameObject answerCanvas;
    [SerializeField] private InputField answerField;
    [SerializeField] private Button nextButton;
    [SerializeField] private GameObject resultCanvas;
    [SerializeField] private GameObject backToMenuCanvas;
    [SerializeField] private TMP_Text timeResult;
    [SerializeField] private TMP_Text correctResult;
    [SerializeField] private TMP_Text errorsResult;
    private bool proceed;
    private int error = 0;
    private float time = 0f;
    private bool isRunning = false;

    // Mehtod to get colors from db
    IEnumerator Ishihara()
    {
        startButton.onClick.AddListener(StartTest); //listener to start button
        backToMenuButton.onClick.AddListener(BackToMenu); //listener to try again button

        for (int i = 0; i<3; i++)
        {
            Sprite newSprite = Sprite.Create(images[i], new Rect(0, 0, 
                                                                images[i].width, 
                                                                images[i].height), 
                                                                new Vector2(0.5f, 0.5f));
            testPanel.sprite = newSprite;

            nextButton.onClick.RemoveAllListeners();
            nextButton.onClick.AddListener(() => OnButtonClick(answerField.text, correctAnswers[i]));

            // Waiting for user click an some answer button
            while(!proceed)
            {
                yield return null;
            }

            proceed = false;
        }

        // hide canvas with colors
        // hide canvas with answers
        // show canvas with results
        // show canvas with button to try again
        colorCanvas.SetActive(false);
        answerCanvas.SetActive(false);
        resultCanvas.SetActive(true);
        backToMenuCanvas.SetActive(true);

        timeResult.text = FormatTime(time).ToString();                   // print test's time
        correctResult.text = (correctAnswers.Length - error).ToString(); // print correct score
        errorsResult.text = error.ToString();                            // print errors score

        yield return new WaitForSeconds(0);
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
    void StartTest()
    {
        startCanvas.SetActive(false);
        colorCanvas.SetActive(true);
        answerCanvas.SetActive(true);
        time = 0f; // set time as 0s
        isRunning = true; // start counting time
    }

    // method to change proceed value
    void OnButtonClick(string correctAnswer, string guessAnswer)
    { 
        proceed = true; 
        // if guess is wrong add +1 to the error variable
        if(correctAnswer.Equals(guessAnswer) == false) { error++; }
    }

    // method which starts test after clicking button
    void BackToMenu()
    {
        resultCanvas.SetActive(false);
        backToMenuCanvas.SetActive(false);
        startCanvas.SetActive(true);
        SceneManager.LoadScene("LoginScene");
    }

    // Main method
    IEnumerator Start()
    {
        proceed = false; 
        yield return StartCoroutine(Ishihara());
    }
    void Update()
    {
        // if isRunning is true, keep adding time
        if (isRunning) { time += Time.deltaTime; }
    }
}
