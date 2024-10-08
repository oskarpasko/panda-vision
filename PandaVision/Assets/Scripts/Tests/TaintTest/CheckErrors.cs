using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CheckErrors : MonoBehaviour
{
    /// <param name="endCanvas"> Reference to canvas with ending test UI </param>
    /// <param name="resultCanvas"> Reference to canvas with results </param>
    /// <param name="buttons"> Array of all the buttons in the scene </param>
    /// <param name="endTestButton"> Reference to the UI "End Test" button </param>
    /// <param name="resultText"> Reference to the UI text to show the result </param>
    [SerializeField] GameObject endcanvas;
    [SerializeField] GameObject resultCanvas;
    public TaintTestButton[] buttons;  
    public Button endTestButton;     
    public TMP_Text resultErrors;          

    void Start()
    {
        // Add listener for "End Test" button
        endTestButton.onClick.AddListener(EndTest);
    }

    // Method which will be called when the "Zakończ" button is pressed
    void EndTest()
    {
        // Count how many errors user did
        int errors = CountErrors();
        
        // Show the result in the UI text
        if (resultErrors != null)
        {
            resultErrors.text = "" + errors;
        }
        // Set false end Canvas and show results
        endcanvas.SetActive(false);
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
}
