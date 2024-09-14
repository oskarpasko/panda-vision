using UnityEngine;

public class TaintTestButton : MonoBehaviour
{
    [SerializeField]private string correctCubeName;  
    private bool error = false;

    void OnCollisionStay(Collision collision)
    {
        error = (collision.gameObject.name != correctCubeName) ? true : false ;
    }

    void OnCollisionExit(Collision collision)
    {
        // Reset the status when the cube leaves the button
        if (collision.gameObject.name == correctCubeName)
        {
            error = false;
        }
    }

    // Method to check if the correct cube is on the button
    public bool Error()
    {
        return error;
    }
}
