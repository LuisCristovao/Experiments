using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Powers : MonoBehaviour {

    public GameObject[] projectiles;
    public float shoot_force = 10;

    Transform tr;
    int projectile_index;


    int SelectProjectile()
    {
        int n=Random.Range(0, projectiles.Length);
        return n;
    }

    void Shoot()
    {
        GameObject p = GameObject.Instantiate(projectiles[projectile_index]);
        p.transform.position = tr.position;
        Rigidbody2D rb = p.GetComponent<Rigidbody2D>();
        Debug.Log(tr.parent.transform.eulerAngles);

        if(tr.parent.transform.eulerAngles==new Vector3(0, 0, 0))
        {
            rb.AddForce(new Vector2(0, shoot_force));
        }
        if (tr.parent.transform.eulerAngles == new Vector3(0, 0, 180))
        {
            rb.AddForce(new Vector2(0, -shoot_force));
        }
        if (tr.parent.transform.eulerAngles == new Vector3(0, 0, 270))
        {
            rb.AddForce(new Vector2(shoot_force, 0));
        }
        if (tr.parent.transform.eulerAngles == new Vector3(0, 0, 90))
        {
            rb.AddForce(new Vector2(-shoot_force, 0));
        }

    }


    // Use this for initialization
    void Start () {
        tr = GetComponent<Transform>();
        projectile_index = SelectProjectile();
	}
	
	// Update is called once per frame
	void Update () {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Shoot();
        }
	}
}
