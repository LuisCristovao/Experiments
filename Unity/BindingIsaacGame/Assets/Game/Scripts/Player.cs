using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour {
    public float speed=3;
    Rigidbody2D rb;
    Transform tr;
    
    // Use this for initialization
    void Start () {
        
        rb = GetComponent<Rigidbody2D>();
        tr = GetComponent<Transform>();
        

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


        

    }
}
