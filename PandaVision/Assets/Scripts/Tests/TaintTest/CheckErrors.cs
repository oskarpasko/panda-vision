using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CheckErrors : MonoBehaviour
{
    /// <param name="buttons"> Array of all the buttons in the scene </param>
    /// <param name="endTestButton"> Reference to the UI "End Test" button </param>
    /// <param name="resultText"> Reference to the UI text to show the result </param>
    public TaintTestButton[] buttons;  
    public Button endTestButton;     
    public TMP_Text resultText;          

    void Start()
    {
        // Add listener for "End Test" button
        endTestButton.onClick.AddListener(EndTest);
    }

    // Method which will be called when the "Zakończ" button is pressed
    void EndTest()
    {
        int errors = CountErrors();
        
        // Show the result in the UI text
        if (resultText != null)
        {
            resultText.text = "Błednie dopasowane sześciany: " + errors;
        }
    }

    // Method to count how many buttons have the correct cubes on them
    private int CountErrors()
    {
        int errorCount = 0;
        foreach (TaintTestButton button in buttons)
        {
            if (button.Error())
            {
                errorCount++;
            }
        }
        return errorCount;
    }
}
