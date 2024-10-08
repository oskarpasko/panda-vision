using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CheckErrors : MonoBehaviour
{
    /// <param name="endCanvas"> Reference to canvas with ending test UI </param>
    /// <param name="resultCanvas"> Reference to canvas with results </param>
    /// <param name="buttons"> Array of all the buttons in the scene </param>
    /// <param name="endTestButton"> Reference to the UI "End Test" button </param>
    /// <param name="resultErrors"> Reference to the UI text to show the result </param>
    /// <param name="resultCorrects"> Reference to the UI text to show the result </param>
    /// <param name="resultTime"> Reference to the UI text to show the result </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] GameObject endCanvas;
    [SerializeField] GameObject resultCanvas;
    public TaintTestButton[] buttons;  
    public Button endTestButton;     
    public TMP_Text resultErrors;     
    public TMP_Text resultCorrects;     
    public TMP_Text resultTime;     
    private float time = 0f;
    private bool isRunning = false;    

    void Start()
    {
        // Add listener for "End Test" button
        endTestButton.onClick.AddListener(EndTest);

        if(endCanvas.activeInHierarchy)
        {
            time = 0f; // set time as 0s
            isRunning = true; // start counting time
        }
    }
    void Update()
    {
        // if isRunning is true, keep adding time
        if (isRunning) { time += Time.deltaTime; }
    }

    // Method which will be called when the "Zakończ" button is pressed
    void EndTest()
    {
        isRunning = false; // stop counting time

        // Count how many errors user did
        int errors = CountErrors();
        
        // Show the result in the UI text
        if (resultErrors != null)
        {
            resultErrors.text = "" + errors;                    // print errors score
            resultCorrects.text = "" + (5 - errors);            //print correct score
            resultTime.text = FormatTime(time).ToString();      // print test's time
        }
        // Set false end Canvas and show results
        endCanvas.SetActive(false);
        resultCanvas.SetActive(true);
    }

    // Method to count how many buttons have the correct cubes on them
    private int CountErrors()
    {
        int errorCount = 0;
        foreach (TaintTestButton button in buttons)
        {
            if (button.HasError())
            {
                errorCount++;
            }
        }
        return errorCount;
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
}
