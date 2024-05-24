using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ColorCubeTest : Test 
{
    public string name;
    public string sceneName;

    public ColorCubeTest()
    {
        name = "Test Kolorowych Sześcianów";
        sceneName = "ColorCubeTest";
    }

    public override void description()
    {
        Debug.Log($"Test o nazwie {this.name} to test ...");
    }
}

