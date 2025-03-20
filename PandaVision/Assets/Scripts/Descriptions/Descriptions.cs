using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NewBehaviourScript : MonoBehaviour
{
    [SerializeField] private GameObject testColorButton;
    [SerializeField] private GameObject testTwoColorButton;
    [SerializeField] private GameObject testTwoColorETButton;
    [SerializeField] private GameObject testColorCubeButton;
    [SerializeField] private GameObject ishiharaButton;


    // method which hide description of Color Test
    public void testColorDescHide()
    {
        testColorButton.SetActive(false);
    }
    // method which hide description of Color Cube Test
    public void testColorCubeDescHide()
    {
        testColorCubeButton.SetActive(false);
    }
    // method which hide description of Ishihara Test
    public void ishiharaDescHide()
    {
        ishiharaButton.SetActive(false);
    }
    // method which hide description of Two Colors Test
    public void testTwoColorDescHide()
    {
        testTwoColorButton.SetActive(false);
    }
    // method which hide description of Two Colors Test (Eye Tracker)
    public void testTwoColorETDescHide()
    {
        testTwoColorETButton.SetActive(false);
    }
}
