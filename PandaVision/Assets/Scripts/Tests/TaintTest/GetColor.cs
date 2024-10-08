using UnityEngine;
using UnityEngine.UI;

public class GetColor : MonoBehaviour
{
    /// <param name="redButton"> Button which sets correctCubeName variable to check names for red color </param>
    /// <param name="greenButton"> Button which sets correctCubeName variable to check names for green color </param>
    /// <param name="blueButton"> Button which sets correctCubeName variable to check names for blue color </param>
    /// <param name="startCanvas"> Reference to canvas with start UI </param>
    /// <param name="endCanvas"> Reference to canvas with ending test UI </param>
    /// <param name="buttons"> All buttons to set them active later </param>
    /// <param name="Cubes"> All cubes to set them active later </param>
    [SerializeField] private Button redButton;
    [SerializeField] private Button greenButton;
    [SerializeField] private Button blueButton;
    [SerializeField] private GameObject startCanvas;
    [SerializeField] private GameObject endCanvas;
    [SerializeField] private GameObject buttons;
    [SerializeField] private GameObject Cubes;
    private void Start() {
        redButton.onClick.AddListener(SetColorToRed);
        greenButton.onClick.AddListener(SetColorToGreen);
        blueButton.onClick.AddListener(SetColorToBlue);
    }

    // Methods which assign 0-red, 1-greem, 2-blue fo the variablke
    // which is used to check what color we will use for the test
    public void SetColorToRed() 
    { 
        GlobalColor.globalColor = 0;
        ShowCubes();
    }
    public void SetColorToGreen() 
    { 
        GlobalColor.globalColor = 1;
        ShowCubes();
    }
    public void SetColorToBlue() 
    { 
        GlobalColor.globalColor = 2; 
        ShowCubes();
    }
    // Method to show buttons and cubes after sets color
    public void ShowCubes()
    {
        startCanvas.SetActive(false);
        endCanvas.SetActive(true);
        buttons.SetActive(true);
        Cubes.SetActive(true);
    }
}
