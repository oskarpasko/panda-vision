using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using System.Collections;

public class CheckErrors : MonoBehaviour
{
    /// <param name="endCanvas"> Reference to canvas with ending test UI </param>
    /// <param name="resultCanvas"> Reference to canvas with results </param>
    /// <param name="startCanvas"> Reference to canvas with start UI </param>
    /// <param name="startTestButton"> Button which start the Test </param>
    /// <param name="backtoMenu"> Button which backs to the main menu </param>
    /// <param name="buttonsToShow"> All buttons to set them active later </param>
    /// <param name="Cubes"> All cubes to set them active later </param>
    /// <param name="buttons"> Array of all the buttons in the scene </param>
    /// <param name="endTestButton"> Reference to the UI "End Test" button </param>
    /// <param name="resultErrors"> Reference to the UI text to show the result </param>
    /// <param name="resultCorrects"> Reference to the UI text to show the result </param>
    /// <param name="resultTime"> Reference to the UI text to show the result </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] private GameObject endCanvas;
    [SerializeField] private GameObject resultCanvas;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private Button startTestButton;
    [SerializeField] private Button backToMenu;
    [SerializeField] private GameObject buttonsToShow;
    [SerializeField] private GameObject Cubes;
    public TaintTestButton[] buttons;  
    public Button endTestButton;     
    public TMP_Text resultErrors;     
    public TMP_Text resultCorrects;     
    public TMP_Text resultTime;     
    private float time = 0f;
    private bool isRunning = false;    

    void Start()
    {
        startTestButton.onClick.AddListener(StartTest); // Add listener for "Start Test" button
        endTestButton.onClick.AddListener(EndTestStartCoroutine);     // Add listener for "End Test" button
        backToMenu.onClick.AddListener(BackToMenuButton);
    }
    void Update()
    {
        // if isRunning is true, keep adding time
        if (isRunning) { time += Time.deltaTime; }
    }

    void EndTestStartCoroutine() { StartCoroutine(EndTest()); }

    // Method which will be called when the "Zakończ" button is pressed
    IEnumerator EndTest()
    {
        isRunning = false; // stop counting time

        // Count how many errors user did
        int errors = CountErrors();
        
        // Show the result in the UI text
        if (resultErrors != null)
        {
            resultErrors.text = "" + errors;                    // print errors score
            resultCorrects.text = "" + (5 - errors);            // print correct score
            resultTime.text = FormatTime(time).ToString();      // print test's time
        }
        // Set false end Canvas and show results
        endCanvas.SetActive(false);
        resultCanvas.SetActive(true);

        WWWForm form = new WWWForm();

        form.AddField("time", time.ToString());
        form.AddField("correct_colors", (5 - errors).ToString());
        form.AddField("error_colors", errors.ToString());
        form.AddField("user", LoggedEmail.loggedUserEmail);

        using (UnityWebRequest webRequest = UnityWebRequest.Post("http://192.168.0.166:5000/taint_test_result", form))
        {
            yield return webRequest.SendWebRequest();
        }
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

    // Method to show buttons and cubes after sets color
    public void StartTest()
    {
        startCanvas.SetActive(false);
        endCanvas.SetActive(true);
        buttonsToShow.SetActive(true);
        Cubes.SetActive(true);
        
        time = 0f; // set time as 0s
        isRunning = true; // start counting time
    }

    // Method to backing back to the menu
    public void BackToMenuButton()
    {
        buttonsToShow.SetActive(false);
        Cubes.SetActive(false);
        SceneManager.LoadScene("LoginScene");
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
