using UnityEngine;
using UnityEngine.UI;

public class TaintTestButton : MonoBehaviour
{
    /// <param name="correctCubeName"> Correct name for specific cube i hierarchy </param>
    /// <param name="error"> Variable which is used count errors </param>
    [SerializeField] private string correctCubeName;  
    [SerializeField] private Button redButton;
    [SerializeField] private Button greenButton;
    [SerializeField] private Button blueButton;
    private int whichColor = 0;
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
        error = (collision.gameObject.name != correctCubeName) ? true : false ;
    }

    void OnCollisionExit(Collision collision)
    {
        // Reset the status when the cube leaves the button
        if (collision.gameObject.name == correctCubeName) error = false;
    }

    // Method to check if the correct cube is on the button
    public bool Error() { return error; }
    public void setColorToRed() { whichColor = 0; }
    public void setColorToGreen() { whichColor = 1; }
    public void setColorToBlue() { whichColor = 2; }
    public int getWhichColor() { return whichColor; }
    
}
