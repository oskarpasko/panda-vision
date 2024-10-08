using System;
using UnityEngine;
using UnityEngine.UI;

public class TaintTestButton : MonoBehaviour
{
    /// <param name="correctCubeName"> Correct name for specific cube i hierarchy </param>
    /// <param name="error"> Variable which is used count errors </param>
    /// <param name="whichColor"> Variavble with correct color's names </param>
    /// <param name="error"> Variable to check errors </param>
    /// <param name="getColor"> Instance of GetColor class to get color later in the code </param>
    [SerializeField] private string[] correctCubeName = new string[3];  
    private string whichColor;
    private bool error = false;
    private void Start() { SetWhichColor(); }

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
    public bool HasError() { return error; }
    // Method to set correct color's names for button in the test
    public void SetWhichColor() { whichColor = correctCubeName[GlobalColor.globalColor]; }
    public string GetWhichColor() { return whichColor; }
    
}
