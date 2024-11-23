using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using System.Collections;

public class TaintTutorial : MonoBehaviour
{
    /// <param name="endCanvas"> Reference to canvas with ending test UI </param>
    /// <param name="startCanvas"> Reference to canvas with start UI </param>
    /// <param name="startTestButton"> Button which start the Test </param>
    /// <param name="backtoMenu"> Button which backs to the main menu </param>
    /// <param name="buttonsToShow"> All buttons to set them active later </param>
    /// <param name="Cubes"> All cubes to set them active later </param>
    /// <param name="cubes"> Array with cubes for the test </param>
    /// <param name="buttons"> Array of all the buttons in the scene </param>
    /// <param name="endTestButton"> Reference to the UI "End Test" button </param>
    /// <param name="time"> variable to count time in seconds </param>
    /// <param name="isRunning"> variable to check if time is running </param>
    [SerializeField] private GameObject endCanvas;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private GameObject resultCanvas;
    [SerializeField] private Button startTestButton;
    [SerializeField] private Button backToMenu;
    [SerializeField] private GameObject buttonsToShow;
    [SerializeField] private GameObject Cubes;
    [SerializeField] private GameObject[] cubes;
    public Button endTestButton;           
    private float time = 0f;
    private bool isRunning = false;    

    void Start()
    {
        ShuffleCubes(cubes);
        startTestButton.onClick.AddListener(StartTest);               // Add listener for "Start Test" button
        endTestButton.onClick.AddListener(EndTestStartCoroutine);     // Add listener for "End Test" button
        backToMenu.onClick.AddListener(BackToMenuButton);             // Add listener for "Back To Menu" button
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
        
        // Set false end Canvas and show results
        // Set true result Canvas and show results
        endCanvas.SetActive(false);
        resultCanvas.SetActive(true);

        WWWForm form = new WWWForm();

        form.AddField("time", time.ToString());
        //form.AddField("user", LoggedUsername.loggedUserName);
        form.AddField("user", "oskarpasko");

        using (UnityWebRequest webRequest = UnityWebRequest.Post(ApiUrl.Apiurl + "/taint_tutorial", form))
        {
            yield return webRequest.SendWebRequest();
        }
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
        resultCanvas.SetActive(false);
        startCanvas.SetActive(true);
        SceneManager.LoadScene("LoginScene");
    }

    // method do suffle the cubes
    void ShuffleCubes(GameObject[] cubes)
{
    for (int i = cubes.Length - 1; i > 0; i--)
    {
        // Wygenerowanie losowego indeksu
        int rnd = UnityEngine.Random.Range(0, i + 1);

        // Zamiana miejscami pozycji cube'ów w świecie gry
        Vector3 tempPosition = cubes[i].transform.position;
        cubes[i].transform.position = cubes[rnd].transform.position;
        cubes[rnd].transform.position = tempPosition;

        // Zamiana obiektów w tablicy
        GameObject tempCube = cubes[i];
        cubes[i] = cubes[rnd];
        cubes[rnd] = tempCube;
    }
}
}
