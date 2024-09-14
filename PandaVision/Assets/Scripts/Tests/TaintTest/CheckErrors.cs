using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class CheckErrors : MonoBehaviour
{
    public TaintTestButton[] buttons;  // Array of all the buttons in the scene
    public Button endTestButton;     // Reference to the UI "End Test" button
    public TMP_Text resultText;          // Reference to the UI text to show the result

    void Start()
    {
        // Add listener for "End Test" button
        endTestButton.onClick.AddListener(EndTest);
    }

    // This method will be called when the "End Test" button is pressed
    void EndTest()
    {
        int errors = CountErrors();
        
        // Show the result in the UI text
        if (resultText != null)
        {
            resultText.text = "Błednie dopasowane sześciany: " + errors;
        }
    }

    // Count how many buttons have the correct cubes on them
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
