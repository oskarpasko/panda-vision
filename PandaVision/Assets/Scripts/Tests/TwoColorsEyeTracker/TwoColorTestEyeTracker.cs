using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;
using TMPro;
using UnityEngine.SceneManagement;

public class TwoColorTestEyeTracker : MonoBehaviour
{
    /// <param name="buttons"> list of buttons with answers </param>
    /// <param name="colorToGuess"> color which user have to guess </param>
    /// <param name="startButton"> button to start the test </param>
    /// <param name="backToMenuButton"> button to back to the menu </param>
    /// <param name="buttons"> list of buttons with answers </param>
    /// <param name="startCanvas"> Canvas with start button </param>
    /// <param name="colorCanvas"> Canvas with test's colors </param>
    /// <param name="backToMenuCanvas"> Canvas with button to back to the manu </param>
    [SerializeField] private Button[] buttons;
    [SerializeField] private Text colorToGuess;
    [SerializeField] private Button startButton;
    [SerializeField] private Button backToMenuButton;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private GameObject colorCanvas;
    [SerializeField] private GameObject backToMenuCanvas;

    // Mehtod to get colors from db
    IEnumerator GetColor()
    {
        if(LoggedUsername.loggedUserName == null)
        {
            SceneManager.LoadScene("LoginScene");
        }
        else
        {
            UnityWebRequest www = UnityWebRequest.Get(ApiUrl.Apiurl + "two_color_test"); // connect with db
            yield return www.SendWebRequest();

            if (www.result != UnityWebRequest.Result.Success) // checking connection
            {
                Debug.LogError(www.error);
            }
            else
            {
                startButton.onClick.AddListener(StartTest); //listener to start button
                backToMenuButton.onClick.AddListener(BackToMenu); //listener to try again button

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
                    // showing color to guess
                    colorToGuess.text = Convert.ToString(colorsArray2D[i, 6]);

                    // mechanism to random index
                    int randomIndex = UnityEngine.Random.Range(0, 2); // Randomly select index 0 or 1
                    int secondIndex = 1 - randomIndex;    // The other index is the one not selected

                    // Set colors for buttons
                    Color32 colorToCanvasLeft = new Color32(Convert.ToByte(colorsArray2D[i, 0]), // Red
                                                            Convert.ToByte(colorsArray2D[i, 1]), // Green
                                                            Convert.ToByte(colorsArray2D[i, 2]), // Blue
                                                            255); // Alpha

                    Color32 colorToCanvasRight = new Color32(Convert.ToByte(colorsArray2D[i, 3]), // Red
                                                             Convert.ToByte(colorsArray2D[i, 4]), // Green
                                                             Convert.ToByte(colorsArray2D[i, 5]), // Blue
                                                             255); // Alpha

                    // Assign colors to buttons in a random order
                    buttons[randomIndex].GetComponent<Image>().color = colorToCanvasLeft;
                    buttons[secondIndex].GetComponent<Image>().color = colorToCanvasRight;

                    // Wait for 5 seconds before proceeding to the next color
                    yield return new WaitForSeconds(5f);
                }
                colorCanvas.SetActive(false);
                backToMenuCanvas.SetActive(true);

                //WWWForm form = new WWWForm();
                //form.AddField("time", time.ToString());
                // using (UnityWebRequest webRequest = UnityWebRequest.Post(ApiUrl.Apiurl + "two_color_test_result", form))
                // {
                //     yield return webRequest.SendWebRequest();
                // }
            }
        }
    }

    // method which starts test after clicking button
    void StartTest()
        {
            startCanvas.SetActive(false);
            colorCanvas.SetActive(true);
        }
        // method which starts test after clicking button
    void BackToMenu()
        {
            backToMenuCanvas.SetActive(false);
            startCanvas.SetActive(true);
            SceneManager.LoadScene("LoginScene");
        }
    // Main method
    IEnumerator Start()
    {
        yield return StartCoroutine(GetColor());
    }
    void Update()
    {

    }
}
