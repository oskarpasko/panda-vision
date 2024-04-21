using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Color : MonoBehaviour
{

    private Renderer objectRenderer;

    // Start is called before the first frame update
    void Start()
    {
        ///
        /// <param name="red"> Przechowuje dane o nasyceniu czerwnoej barwy </param>
        /// <param name="green"> Przechowuje dane o nasyceniu zielonej barwy </param>
        ///  <param name="blue"> Przechowuje dane o nasyceniu niebieskiej barwy </param>
        ///
        int red = Random.Range(0, 256);
        int green = Random.Range(0, 256);
        int blue = Random.Range(0, 256);

        // Renderowanie koloru
        objectRenderer = GetComponent<Renderer>();
        objectRenderer.material.color = new Color32((byte)red, (byte)green, (byte)blue, 255);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
