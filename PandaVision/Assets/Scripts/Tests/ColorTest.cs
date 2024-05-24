using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ColorTest : Test 
{
    public string name;
    public string sceneName;

    public ColorTest()
    {
        name = "Test Kolorów";
        sceneName = "ColorTest";
    }

    public override void description()
    {
        Debug.Log($"Test o nazwie {this.name} to test ...");
    }
}

