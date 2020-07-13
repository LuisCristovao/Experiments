using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Runtime.InteropServices;
using UnityEngine;

public class DefenseGame : MonoBehaviour
{
    public GameObject square;
    private Boolean pressed = false;
    private Boolean idle = true;
    private double time = 0;
    private GameObject player;
    float circle_size = 0f;
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.Find("magic");
        Instantiate(square, new Vector3(0, 0, 0), Quaternion.identity);
    }

    // Update is called once per frame
    void Update()
    {
        
        double delta= Time.deltaTime;
        time += delta;

        Vector3 worldPoint = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        Vector2 worldPoint2d = new Vector2(worldPoint.x, worldPoint.y);
        transform.position = worldPoint2d;

        if (pressed)
        {
            circle_size = (float) Math.Sin(2*time);
            
            this.transform.localScale = new Vector2(3*circle_size, 3*circle_size);
            Color c = this.GetComponent<SpriteRenderer>().color;
            //print(c);
            this.GetComponent<SpriteRenderer>().color = new Color(Math.Abs(circle_size), 0f, 0f,1.0f);
            //print(this.GetComponent<SpriteRenderer>().color);
        }
        else
        {
            if (!pressed && idle==false)
            {
                this.transform.localScale = new Vector2(1f, 1f);
                this.GetComponent<SpriteRenderer>().color = new Color(1, 1, 0, 1);
                GameObject s = Instantiate(square, player.transform.position, Quaternion.identity);
                Rigidbody2D rb = s.GetComponent<Rigidbody2D>();
                Vector2 delta_direction = (this.transform.position - player.transform.position);
                rb.AddForce(delta_direction*(Math.Abs(circle_size)*100));
                rb.AddTorque(-100);
                idle = true;
            }
            
        }


        //Debug.Log(worldPoint2d);
        if (Input.GetMouseButtonDown(0))
        {
            /*print("Pressed");
            GameObject s= Instantiate(square, worldPoint2d, Quaternion.identity);
            Rigidbody2D rb = s.GetComponent<Rigidbody2D>();
            rb.AddForce(new Vector2(100, 0));
            rb.AddTorque(-10);
            */
            pressed = true;
            idle = false;
        }
        else
        {
            
            if (Input.GetMouseButtonUp(0))
            {
                pressed = false;
                

            }
                
        }
    }

  
}
