using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;


public class Player : MonoBehaviour {
    public float speed=3;
    public int dodge_speed=2;
    public float dodge_time = 0.02f;
    Rigidbody2D rb;
    Transform tr;
    bool count_dodge = false;
    double dodge_timer = 0;
    // Use this for initialization
    void Start () {
        
        rb = GetComponent<Rigidbody2D>();
        tr = GetComponent<Transform>();
        

    }
	
    

    void reverse_speed()
    {
        speed = speed / dodge_speed; count_dodge = false;
    }

	// Update is called once per frame
	void Update () {
        //Debug.Log(tr.eulerAngles);
        rb.velocity = new Vector2(0, 0);
        rb.angularVelocity = 0;
        if (Input.GetKey("d") || Input.GetKey(KeyCode.RightArrow))
        {
            rb.velocity = new Vector2(speed, rb.velocity.y);
            tr.rotation = Quaternion.AngleAxis(-90, new Vector3(0, 0, 1));
        }
        if (Input.GetKey("a") || Input.GetKey(KeyCode.LeftArrow))
        {
            rb.velocity = new Vector2(-speed, rb.velocity.y);
            tr.rotation = Quaternion.AngleAxis(90, new Vector3(0, 0, 1));
        }
        if (Input.GetKey("w") || Input.GetKey(KeyCode.UpArrow))
        {
            rb.velocity = new Vector2(rb.velocity.x, speed);
            tr.rotation = Quaternion.AngleAxis(0, new Vector3(0, 0, 1));
        }
        if (Input.GetKey("s") || Input.GetKey(KeyCode.DownArrow))
        {
            rb.velocity = new Vector2(rb.velocity.x, -speed);
            tr.rotation = Quaternion.AngleAxis(180, new Vector3(0, 0, 1));
        }
        if (Input.GetKey("k") )
        {
            if (count_dodge==false)
            {
                speed = speed * dodge_speed;
                count_dodge = true;
                dodge_timer = 0;
            }
            
            
        }
        dodge_timer += Time.deltaTime;
        Debug.Log("Timer: " + dodge_timer);
        if (dodge_timer >= dodge_time && count_dodge==true)
        {
            reverse_speed();
        }



    }
}
