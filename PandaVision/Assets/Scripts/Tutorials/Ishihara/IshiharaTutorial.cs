using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using TMPro;
using UnityEngine.SceneManagement;

public class IshiharaTutorial : MonoBehaviour
{
    /// <param name="testPanel"> Canvas which is displaying colors for test </param>
    /// <param name="backToMenuButton"> button to back to the menu </param>
    /// <param name="colorCanvas"> Canvas with test's colors </param>
    /// <param name="answerCanvas"> Canvas with answers </param>
    /// <param name="answerField"> Field with the answer </param>
    /// <param name="nextButton"> Button to get next image </param>
    /// <param name="backToMenuCanvas"> Canvas with button to back to the manu </param>
    /// <param name="proceed"> variable to work with waiting for click button </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] private Image testPanel;
    [SerializeField] private Texture2D[] images;
    [SerializeField] private Button backToMenuButton;
    [SerializeField] private GameObject colorCanvas;
    [SerializeField] private GameObject answerCanvas;
    [SerializeField] private InputField answerField;
    [SerializeField] private Button nextButton;
    [SerializeField] private GameObject backToMenuCanvas;
    private bool proceed;
    private float time = 0f;
    private bool isRunning = false;

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

            ShuffleImagesAndAnswers(images);  // Shuffle the images

            // main loop for the test
            for (int i = 0; i < images.Length; i++)
            {
                // set text for the text field to none
                answerField.text = ""; 
                // prepare the new image
                Sprite newSprite = Sprite.Create(images[i], new Rect(0, 0, 
                                                                    images[i].width, 
                                                                    images[i].height), 
                                                                    new Vector2(0.2f, 0.2f));
                // diplay the new image
                testPanel.sprite = newSprite;

                // add Listener to the button to get new image and check correct answer
                nextButton.onClick.RemoveAllListeners();
                nextButton.onClick.AddListener(() => OnButtonClick());

                // waiting for user click an some answer button
                while(!proceed)
                {
                    yield return null;
                }

                proceed = false;
            }

            // hide canvas with ishihara images
            // hide canvas with answers
            // show canvas with button to try again
            colorCanvas.SetActive(false);
            answerCanvas.SetActive(false);
            backToMenuCanvas.SetActive(true);

            WWWForm form = new WWWForm();

            form.AddField("time", time.ToString());
            // form.AddField("user", LoggedUsername.loggedUserName);
            form.AddField("user", "oskarpasko");


            using (UnityWebRequest webRequest = UnityWebRequest.Post(ApiUrl.Apiurl + "ishihara_tutorial", form))
            {
                yield return webRequest.SendWebRequest();
            }
        }
    }

    // Method to shuffle images and answers
    void ShuffleImagesAndAnswers(Texture2D[] img)
    {
        for (int i = img.Length - 1; i > 0; i--)
        {
            // random number
            int rnd = UnityEngine.Random.Range(0, i + 1);

            // shuffle images
            Texture2D temp = img[i];
            img[i] = img[rnd];
            img[rnd] = temp;
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
    void OnButtonClick() { proceed = true; }

    // Method which starts test after clicking button
    void BackToMenu()
    {
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
