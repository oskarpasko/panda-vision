using UnityEngine;
using UnityEngine.UI;

public class TaintTestButton : MonoBehaviour
{
    /// <param name="correctCubeName"> Correct name for specific cube i hierarchy </param>
    /// <param name="error"> Variable which is used count errors </param>
    [SerializeField] private string[] correctCubeName = new string[3];  
    [SerializeField] private Button redButton;
    [SerializeField] private Button greenButton;
    [SerializeField] private Button blueButton;
    private string whichColor;
    private bool error = false;

    private void Start() {
        redButton.onClick.AddListener(setColorToRed);
        greenButton.onClick.AddListener(setColorToGreen);
        blueButton.onClick.AddListener(setColorToBlue);
    }

    // Method which checks if correct cubes was placed on the button
    void OnCollisionStay(Collision collision)
    {
        // if correct cube   -> error = true
        // if uncorrect cube -> error = false
        error = (collision.gameObject.name != whichColor) ? true : false ;
    }

    void OnCollisionExit(Collision collision)
    {
        // Reset the status when the cube leaves the button
        if (collision.gameObject.name == whichColor) error = false;
    }

    // Method to check if the correct cube is on the button
    public bool Error() { return error; }
    public void setColorToRed() { whichColor = correctCubeName[0]; }
    public void setColorToGreen() { whichColor = correctCubeName[1]; }
    public void setColorToBlue() { whichColor = correctCubeName[2]; }
    public int getWhichColor() { return whichColor; }
    
}
