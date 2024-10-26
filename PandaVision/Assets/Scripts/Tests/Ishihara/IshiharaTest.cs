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
    /// <param name="backToMenuButton"> button to back to the menu </param>
    /// <param name="buttons"> list of buttons with answers </param>
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
    /// <param name="errorLog"> variable to save the errors made by user </param>
    [SerializeField] private Image testPanel;
    [SerializeField] private Texture2D[] images;
    [SerializeField] private String[] correctAnswers;
    [SerializeField] private Button backToMenuButton;
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
    private string errorLog = "";

    // Mehtod to controll the Ishihara test
    IEnumerator Ishihara()
    {
        if(LoggedUsername.loggedUserName == null)
        {
            SceneManager.LoadScene("LoginScene");
        }
        else
        {
            backToMenuButton.onClick.AddListener(BackToMenu); //listener to try again button

            ShuffleImagesAndAnswers(images, correctAnswers);  // Shuffle the images and answers

            // main loop for the test
            for (int i = 0; i < images.Length; i++)
            {
                // set text for the text field to none
                answerField.text = ""; 
                // prepare the new image
                Sprite newSprite = Sprite.Create(images[i], new Rect(0, 0, 
                                                                    images[i].width, 
                                                                    images[i].height), 
                                                                    new Vector2(0.5f, 0.5f));
                // diplay the new image
                testPanel.sprite = newSprite;

                // add Listener to the button to get new image and check correct answer
                nextButton.onClick.RemoveAllListeners();
                nextButton.onClick.AddListener(() => OnButtonClick(correctAnswers[i], answerField.text, images[i].name.ToString()));

                // waiting for user click an some answer button
                while(!proceed)
                {
                    yield return null;
                }

                proceed = false;
            }

            // hide canvas with ishihara images
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

            WWWForm form = new WWWForm();

            form.AddField("time", time.ToString());
            form.AddField("correct_colors", (correctAnswers.Length - error).ToString());
            form.AddField("error_colors", error.ToString());
            form.AddField("error_log", errorLog);
            form.AddField("user", LoggedUsername.loggedUserName);

            using (UnityWebRequest webRequest = UnityWebRequest.Post("http://192.168.0.166:5000/ishihara_test_result", form))
            {
                yield return webRequest.SendWebRequest();
            }
        }
    }

    // Method to shuffle images and answers
    void ShuffleImagesAndAnswers(Texture2D[] img, string[] answers)
    {
        for (int i = img.Length - 1; i > 0; i--)
        {
            // random number
            int rnd = UnityEngine.Random.Range(0, i + 1);

            // shuffle images
            Texture2D temp = img[i];
            img[i] = img[rnd];
            img[rnd] = temp;

            // shuffle answers
            string temp2 = answers[i];
            answers[i] = answers[rnd];
            answers[rnd] = temp2;
        }
    }
    // Method to format time
    private string FormatTime(float time)
    {
        // get seconds 
        int seconds = Mathf.FloorToInt(time);
        // get milliseconds 
        int milliseconds = Mathf.FloorToInt((time - seconds) * 100);
        // return formatted string with seconds and milliseconds
        return string.Format("{0}.{1:00}", seconds, milliseconds);
    }
    // Method to change proceed value
    void OnButtonClick(string correctAnswer, string guessAnswer, string image)
    { 
        proceed = true; 
        // if guess is wrong add +1 to the error variable
        if(correctAnswer.Equals(guessAnswer) == false) { 
            error++;                                            // count the erros
            errorLog += image + " - " + guessAnswer + "; ";     // make a log (plate and the wrong answer)
        }
    }

    // Method which starts test after clicking button
    void BackToMenu()
    {
        resultCanvas.SetActive(false);
        backToMenuCanvas.SetActive(false);
        colorCanvas.SetActive(true);
        answerCanvas.SetActive(true);
        SceneManager.LoadScene("LoginScene");
    }

    // Main method
    IEnumerator Start()
    {
        time = 0f; // set time as 0s
        isRunning = true; // start counting time
        proceed = false; 
        yield return StartCoroutine(Ishihara());
    }
    void Update()
    {
        // if isRunning is true, keep adding time
        if (isRunning) { time += Time.deltaTime; }
    }
}
