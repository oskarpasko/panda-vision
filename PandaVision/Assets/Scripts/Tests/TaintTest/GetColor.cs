using UnityEngine;
using UnityEngine.UI;

public class GetColor : MonoBehaviour
{
    /// <param name="redButton"> Button which sets correctCubeName variable to check names for red color </param>
    /// <param name="greenButton"> Button which sets correctCubeName variable to check names for green color </param>
    /// <param name="blueButton"> Button which sets correctCubeName variable to check names for blue color </param>
    /// <param name="startTestButton"> Button which start the Test </param>
    [SerializeField] private Button redButton;
    [SerializeField] private Button greenButton;
    [SerializeField] private Button blueButton;
    [SerializeField] private Button startTestButton;
    private void Start() {
        redButton.onClick.AddListener(SetColorToRed);
        greenButton.onClick.AddListener(SetColorToGreen);
        blueButton.onClick.AddListener(SetColorToBlue);
    }
    // Methods which assign 0-red, 1-greem, 2-blue fo the variablke
    // which is used to check what color we will use for the test
    public void SetColorToRed() { 
        GlobalColor.globalColor = 0; 
        StartTestButtonSetActive();
    }
    public void SetColorToGreen() { 
        GlobalColor.globalColor = 1; 
        StartTestButtonSetActive();
    }
    public void SetColorToBlue() { 
        GlobalColor.globalColor = 2; 
        StartTestButtonSetActive();
    }
    public void StartTestButtonSetActive() { startTestButton.gameObject.SetActive(true); }
}
